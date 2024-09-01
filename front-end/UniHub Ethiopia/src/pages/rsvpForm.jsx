import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getCookie } from "@/utils/requestHandler";

const RsvpForm = () => {
  const { eventId } = useParams();
  const { state } = useLocation();
  const { title, image } = state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const payLoad = {
        ...data,
        eventId,
      };

      const token = getCookie("accessToken");
      const response = await axios.post(
        "http://localhost:3000/api/events/rsvp",
        payLoad,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("RSVP successful:", response.data);
        alert("Thank you for your Response");
      } else {
        console.error("Failed to RSVP");
        alert("Failed to Response. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
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
        <label htmlFor="name" className="font-semibold mb-2">
          Name :
        </label>
        <input
          type="text"
          placeholder="Name"
          className="p-4 border shadow-2xl mb-2"
          {...register("name", { required: true, maxLength: 80 })}
        />
        {errors.name && (
          <span className=" mb-5 text-red-500">* This field is required</span>
        )}

        <label htmlFor="email" className="font-semibold mb-2">
          Email :
        </label>
        <input
          type="text"
          placeholder="Email"
          className=" p-4 mb-2 border shadow-2xl"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <span className="mb-5 text-red-500">* Invalid email address</span>
        )}

        <label htmlFor="name" className="font-semibold mb-2">
          Number Of Guests :
        </label>
        <input
          type="number"
          placeholder="Number of Guests"
          className="p-4 mb-2 border shadow-2xl"
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
