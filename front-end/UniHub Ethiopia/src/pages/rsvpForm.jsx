import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/utils/requestHandler";
import { useState } from "react";
import { submitRsvpForm } from "@/api/events";
import { Loader } from "rsuite";

const RsvpForm = () => {
  const { eventId } = useParams();
  const { state } = useLocation();
  const { title, image } = state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payLoad = { ...data, eventId };
      const token = getCookie("accessToken");

      setLoading(true);
      await submitRsvpForm(payLoad, token);
      setLoading(false);

      alert("Thank you for your response!");
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Display message from the server
      } else {
        console.error("Error submitting RSVP:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container w-5/6 mt-40 pt-10 flex flex-row justify-around shadow-2xl ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/5 mr-20 pl-10"
      >
        <h2 className="text-xl font-bold mb-5">{title}</h2>

        {loading ? (
          <Loader size="md" />
        ) : (
          <>
            <label htmlFor="name" className="font-semibold mb-2">
              Name :
            </label>
            <input
              type="text"
              placeholder="Name"
              className="p-4 border shadow-2xl mb-2 bg-transparent"
              {...register("name", { required: true, maxLength: 80 })}
            />
            {errors.name && (
              <span className="mb-5 text-red-500">
                * This field is required
              </span>
            )}

            <label htmlFor="email" className="font-semibold mb-2">
              Email :
            </label>
            <input
              type="text"
              placeholder="Email"
              className="p-4 mb-2 border shadow-2xl bg-transparent"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="mb-5 text-red-500">* Invalid email address</span>
            )}

            <label htmlFor="numberOfGuests" className="font-semibold mb-2">
              Number Of Guests :
            </label>
            <input
              type="number"
              placeholder="Number of Guests"
              className="p-4 mb-6 border shadow-2xl bg-transparent"
              {...register("numberOfGuests", {
                required: true,
                min: 1,
                max: 10,
              })}
            />
            {errors.numberOfGuests && (
              <span className="mb-5 text-red-500">
                * Please enter a number between 1 and 10
              </span>
            )}

            <Button type="submit" className="mb-10">
              Book
            </Button>
          </>
        )}
        {error && <div className="text-red-500">Error: {error.message}</div>}
      </form>

      <div
        className="w-3/5 bg-cover shadow-2xl mb-10 rounded object-fit"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
    </div>
  );
};

export default RsvpForm;
