"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Header } from "@/components/layout/header";
import { TimePicker } from "@/components/reservation/time-picker";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { services } from "@/lib/services";
import { reservations } from "@/lib/reservations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [service, setService] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const selectedService = services.find((s) => s.id === service);

  const handleReservation = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to make a reservation",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (!date || !selectedTime || !service) {
      toast({
        title: "Incomplete form",
        description: "Please select all required fields",
        variant: "destructive",
      });
      return;
    }

    reservations.create({
      date,
      time: selectedTime,
      service,
      username: user.username,
    });

    toast({
      title: "Success!",
      description: "Your reservation has been confirmed",
    });

    router.push("/reservations");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white ">
      <div className="container mx-auto px-4 py-12">
        <Header />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Book Your Eco-Friendly Service Today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join us in making the world cleaner and greener. Schedule your
              eco-friendly cleaning service with our professional team.
            </p>
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Select Service</h3>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{service.name}</span>
                        <span className="text-green-600">
                          ${service.price}/hour
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedService && (
                <p className="mt-4 text-sm text-gray-600">
                  {selectedService.description}
                </p>
              )}
            </Card>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleReservation}
              disabled={!date || !selectedTime || !service}
            >
              {user ? "Make a Reservation" : "Login to Reserve"}
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Choose Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Choose Time</h3>
              <TimePicker
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
