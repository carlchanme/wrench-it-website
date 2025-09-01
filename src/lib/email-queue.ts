interface EmailJob {
  id: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  retries: number;
  maxRetries: number;
  createdAt: Date;
  scheduledFor: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

class EmailQueue {
  private queue: EmailJob[] = [];
  private processing = false;
  private readonly maxRetries = 3;
  private readonly retryDelay = 5000; // 5 seconds

  addEmail(emailData: {
    to: string;
    subject: string;
    html: string;
    text: string;
    delay?: number;
  }): string {
    const job: EmailJob = {
      id: `email_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
      retries: 0,
      maxRetries: this.maxRetries,
      createdAt: new Date(),
      scheduledFor: new Date(Date.now() + (emailData.delay || 0)),
      status: 'pending',
    };

    this.queue.push(job);
    console.log(`📧 Email queued: ${job.id} to ${job.to}`);

    // Start processing if not already processing
    if (!this.processing) {
      this.processQueue();
    }

    return job.id;
  }

  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    console.log(`🔄 Processing email queue (${this.queue.length} jobs)`);

    while (this.queue.length > 0) {
      const job = this.queue.find(j =>
        j.status === 'pending' && j.scheduledFor <= new Date()
      );

      if (!job) {
        // No jobs ready to process, wait a bit
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      job.status = 'processing';

      try {
        await this.sendEmail(job);
        job.status = 'completed';
        this.removeJob(job.id);
        console.log(`✅ Email sent successfully: ${job.id}`);
      } catch (error) {
        job.retries++;
        console.error(`❌ Email failed (attempt ${job.retries}/${job.maxRetries}): ${job.id}`, error);

        if (job.retries >= job.maxRetries) {
          job.status = 'failed';
          console.error(`💥 Email permanently failed: ${job.id}`);
          this.removeJob(job.id);
        } else {
          job.status = 'pending';
          job.scheduledFor = new Date(Date.now() + this.retryDelay * job.retries);
          console.log(`🔄 Email rescheduled for retry: ${job.id}`);
        }
      }

      // Small delay between jobs
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    this.processing = false;
    console.log('✨ Email queue processing completed');
  }

  private async sendEmail(job: EmailJob): Promise<void> {
    const nodemailer = require('nodemailer');

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      secure: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Send email
    await transporter.sendMail({
      from: `"WrenchIt" <${process.env.GMAIL_USER}>`,
      to: job.to,
      subject: job.subject,
      html: job.html,
      text: job.text,
    });
  }

  private removeJob(jobId: string): void {
    this.queue = this.queue.filter(job => job.id !== jobId);
  }

  getQueueStatus(): {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  } {
    const counts = this.queue.reduce((acc, job) => {
      acc[job.status]++;
      return acc;
    }, { pending: 0, processing: 0, completed: 0, failed: 0 });

    return {
      total: this.queue.length,
      ...counts,
    };
  }

  clearQueue(): void {
    this.queue = [];
    console.log('🗑️ Email queue cleared');
  }
}

// Export singleton instance
export const emailQueue = new EmailQueue();
