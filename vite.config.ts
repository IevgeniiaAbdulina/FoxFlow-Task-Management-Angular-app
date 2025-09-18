import { defineConfig } from 'vite';
import vitePluginEnvCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [vitePluginEnvCompatible()],
});
