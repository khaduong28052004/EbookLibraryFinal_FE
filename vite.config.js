import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode', "swiper/react", "swiper/modules"], // Đảm bảo Vite tối ưu hóa jwt-decode đúng cách
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100, // Tăng tần suất polling (nếu cần)
    },
  }, 
  
  build: {
    sourcemap: true, // Tạo file sourcemap để dễ dàng debug
  },
});
