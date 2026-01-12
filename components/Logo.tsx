import Link from "next/link";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "homepage" | "dashboard" | "auth";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  variant = "dashboard",
  size = "md",
  showText = true,
  className,
  href = "/",
}: LogoProps) {
  const sizeClasses = {
    sm: { icon: "h-4 w-4", text: "text-lg", container: "gap-1.5" },
    md: { icon: "h-6 w-6", text: "text-2xl", container: "gap-2" },
    lg: { icon: "h-8 w-8", text: "text-3xl", container: "gap-2" },
  };

  const variantClasses = {
    homepage: {
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      textColor: "text-white",
    },
    dashboard: {
      iconBg: "bg-red-600",
      textColor: "text-red-600",
    },
    auth: {
      iconBg: "bg-red-600",
      textColor: "text-red-600",
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  const logoContent = (
    <div
      className={cn(
        "flex items-center",
        currentSize.container,
        className
      )}
    >
      <div
        className={cn(
          "p-2 rounded-lg shadow-lg transition-colors",
          currentVariant.iconBg,
          variant === "dashboard" && "hover:bg-red-700"
        )}
      >
        <Film className={cn(currentSize.icon, "text-white")} />
      </div>
      {showText && (
        <h1
          className={cn(
            "font-bold tracking-tight",
            currentSize.text,
            currentVariant.textColor
          )}
        >
          MovieMate
        </h1>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

