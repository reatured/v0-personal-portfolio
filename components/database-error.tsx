import Link from "next/link"
import { AlertTriangle } from "lucide-react"

interface DatabaseErrorProps {
  message?: string
}

export function DatabaseError({ message = "Database connection error" }: DatabaseErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="bg-red-500/10 p-4 rounded-full mb-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Database Connection Error</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <p className="text-sm text-muted-foreground mb-6">
        This could be due to a missing environment variable or connection issue.
      </p>
      <div className="space-y-4">
        <div className="bg-card border border-border p-4 rounded-lg text-left">
          <h3 className="font-semibold mb-2">Possible Solutions:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Check that the DATABASE_URL environment variable is set</li>
            <li>Verify your database connection is active</li>
            <li>Ensure your IP address is allowed in the database firewall settings</li>
          </ul>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
