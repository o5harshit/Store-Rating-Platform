import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({
  title,
  description,
  children,
}) {
  return (
    <Card className="border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">

      <CardContent className="space-y-6 p-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-2 text-slate-400">
            {description}
          </p>

        </div>

        {children}

      </CardContent>

    </Card>
  );
}