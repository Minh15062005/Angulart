import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Tối ưu hiệu suất thay đổi vùng
    provideRouter(routes), // Cung cấp router cho ứng dụng
    provideHttpClient(),  // Kích hoạt HttpClient để gọi API (đúng rồi nè! ✅)
  ]
};
