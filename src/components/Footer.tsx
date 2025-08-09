import React from 'react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Nova Hotels X Staff Handbook</strong> - Created by <strong>Azuliano</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            This is an unofficial tool and is not affiliated with, endorsed by, or officially connected to Nova Hotels X or any of its subsidiaries or affiliates.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This handbook system was created independently to assist with staff training and reference purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}