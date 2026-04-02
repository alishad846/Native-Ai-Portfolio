'use client';
import { useEffect } from 'react';

const FluidCursor = () => {
  useEffect(() => {
    // Load fluid cursor after component mounts
    const timer = setTimeout(() => {
      try {
        // Dynamic import to avoid SSR issues
        import('@/hooks/use-FluidCursor').then(({ default: useFluidCursor }) => {
          if (typeof useFluidCursor === 'function') {
            useFluidCursor();
          }
        }).catch(err => {
          console.error('Failed to load fluid cursor:', err);
        });
      } catch (err) {
        console.error('FluidCursor initialization failed:', err);
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-0">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};

export default FluidCursor;
