package com.Luma_v1.Hotel_Luma.job;

import com.Luma_v1.Hotel_Luma.service.IServiceBooking;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class BookingCleanupJob {

    private final IServiceBooking serviceBooking;

    @Value(value = "${app.booking.expiration-minutes}")
    private int expirationMinutes;

    public BookingCleanupJob(IServiceBooking serviceBooking) {
        this.serviceBooking = serviceBooking;
    }

    @Scheduled(fixedRateString = "${app.scheduling.cleanup-interval}")
    public void bookingCleanupStatusCancelled() {
        try {
            log.info("Executing job for deletion of booking with status CANCELLED");
            int numDeletion = serviceBooking.jobDeletionOfBookingStatusCancelled();
            log.info("Deleted {} bookings with status CANCELLED", numDeletion);
            log.info("Finalizing job for deletion of booking with status CANCELLED");
        } catch (Exception e) {
            log.error("Error executing job for deletion of booking with status CANCELLED", e);
            log.error(e.getMessage());
            log.error(e.getCause().getMessage());
        }
    }

    @Scheduled(fixedRateString = "${app.scheduling.cleanup-interval}")
    public void bookingChangeStatusPendingToCancelled() {
        try {
            log.info("Executing job for updating status of Booking from PENDING TO CANCELLED");
            int numUpdated = serviceBooking.jobUpdateOfBookingStatusPendingToCancelled(expirationMinutes);
            log.info("Updated {} bookings with status PENDING to CANCELLED", numUpdated);
            log.info("Finalizing job for updating status of Booking from PENDING to CANCELLED");
        } catch (Exception e) {
            log.error("Error executing job for updating status Booking from PENDING to CANCELLED", e);
            log.error(e.getMessage());
            log.error(e.getCause().getMessage());
        }
    }
}
