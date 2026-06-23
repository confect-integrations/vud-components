"use client";

import { useState } from "react";
import { Alert, Button } from "@confect-development/vud-components";

export function AlertDemo() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Alert type="info">This is the info alert message</Alert>
        <Alert type="success">Your changes have been saved.</Alert>
        <Alert type="warning">This is the warning alert message</Alert>
        <Alert type="error">This is the error alert message</Alert>
      </div>

      <Alert
        type="warning"
        title="Wrong tenant detected"
        action={
          <>
            <Button size="md" variant="secondary">
              Switch tenant
            </Button>
            <Button size="md" variant="link">
              Go to dashboard
            </Button>
          </>
        }
      >
        You are signed in to a different tenant than the one this link points to. Switch tenants
        to continue, or return to your dashboard.
      </Alert>

      {dismissed ? (
        <Button variant="secondary" onClick={() => setDismissed(false)}>
          Restore dismissible alert
        </Button>
      ) : (
        <Alert type="info" title="Heads up" onClose={() => setDismissed(true)}>
          A heading, rich body content and a dismiss button — close me with the ×.
        </Alert>
      )}
    </div>
  );
}
