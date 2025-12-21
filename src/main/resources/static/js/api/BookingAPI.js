export const BookingAPI = {
   getBookingsByEmail: async function(){
       const response = await fetch('/api/v1/bookings/getByEmail')
       if (!response.ok) {
           throw new Error("Error in the reply")
       }
       return await response.json()
   }
}