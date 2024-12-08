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
      setUserReservations(prev => prev.filter(r => r.id !== id));
      toast({
        title: "Reservation cancelled",
        description: "Your reservation has been cancelled successfully",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Header />
        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Reservations</h2>
        
        {userReservations.length === 0 ? (
          <Card className="p-6">
            <p className="text-gray-600">You don't have any reservations yet.</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {userReservations.map(reservation => {
              const service = services.find(s => s.id === reservation.service);
              return (
                <Card key={reservation.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {service?.name}
                      </h3>
                      <p className="text-gray-600">
                        {format(new Date(reservation.date), "MMMM d, yyyy")} at{" "}
                        {reservation.time}
                      </p>
                      <p className="text-green-600 font-semibold mt-2">
                        ${service?.price}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => handleCancel(reservation.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}