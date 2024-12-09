"use client";

import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { Reservation } from "@/lib/types";
import { reservations } from "@/lib/reservations";
import { services } from "@/lib/services";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function ReservationsPage() {
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    setUserReservations(reservations.getUserReservations(user.username));
  }, [user, router]);

  const handleCancel = (id: string) => {
    if (reservations.cancel(id)) {
      setUserReservations((prev) => prev.filter((r) => r.id !== id));
      toast({
        title: "Reservation cancelled",
        description: "Your reservation has been cancelled successfully",
      });
    }
  };

  const handleDetail = () => {
    router.push("/reservations/detail");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <div className="container mx-auto p-4">
        {userReservations.map((reservation) => (
          <Card key={reservation.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {services.find((s) => s.id === reservation.service)?.name}
                </h2>
                <p>{format(new Date(reservation.date), "PPpp")}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleDetail}>
                  Detail
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(reservation.id)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
