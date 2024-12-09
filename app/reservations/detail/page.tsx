"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StarRating = ({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            className={`w-8 h-8 cursor-pointer ${
              ratingValue <= (hover || rating)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
            onClick={() => onRatingChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.343 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        );
      })}
    </div>
  );
};

export default function ReservationDetailPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (rating: number) => {
    setRating(rating);
    toast({
      title: "Rating",
      description: `You rated ${rating} star${rating > 1 ? "s" : ""}`,
    });
  };

  const handleSubmit = () => {
    // Handle comment and rating submission
    toast({
      title: "Submitted",
      description: "Your comment and rating have been submitted",
    });
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Reservation Detail</h1>
        <div className="mb-4">
          <video controls className="w-full">
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Leave a Comment:</label>
          <textarea
            className="w-full p-2 border rounded"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rate:</label>
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </main>
  );
}
