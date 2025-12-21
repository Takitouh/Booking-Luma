package com.Luma_v1.Hotel_Luma.service;

import com.Luma_v1.Hotel_Luma.dto.*;

import java.util.List;

public interface IServiceBooking {
    List<GuestBookingDTO> findAllByEmail(String email);

    ResponseBookingDTO findById(Long id);

    ResponseBookingDTO save(CreateBookingDTO booking);

    List<ResponseBookingDTO> saveAll(List<CreateBookingDTO> bookings);

    void deleteById(Long id);

    ResponseBookingDTO updateWithPut(PutBookingDTO booking, Long id);

    void updateStatusPaymentToCompleted(Long idBooking);

    void updateStatusPaymentToCanceled(Long idBooking);

    int jobDeletionOfBookingStatusCancelled();

    int jobUpdateOfBookingStatusPendingToCancelled(int expMin);


    ResponseBookingDTO updateWithPatch(PatchBookingDTO booking, Long id);
}
