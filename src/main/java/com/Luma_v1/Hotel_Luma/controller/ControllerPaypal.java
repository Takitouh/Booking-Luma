package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.PaymentResponseDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseBookingDTO;
import com.Luma_v1.Hotel_Luma.service.IServiceBooking;
import com.Luma_v1.Hotel_Luma.service.IServicePaypal;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/payment")
public class ControllerPaypal {

    private final IServicePaypal servicePaypal;
    private final IServiceBooking serviceBooking;

    public ControllerPaypal(IServicePaypal servicePaypal, IServiceBooking serviceBooking) {
        this.servicePaypal = servicePaypal;
        this.serviceBooking = serviceBooking;
    }

    @PostMapping("/create-payment")
    public String createPayment(@RequestBody ResponseBookingDTO booking) {
        String checkOutUrl = "";
        log.info("Booking: {}", booking.id());
        log.info("Booking: {}", booking);

        try {
            Payment payment;

            Double total = booking.totalPrice().doubleValue();

            payment = servicePaypal.createPayment(total, booking.currency(), booking.method(),
                    booking.intent(), "ID Booking:"+booking.id(), "http://localhost:8080/errorPayment.html?idBooking="+booking.id(),
                    "http://localhost:8080/successPayment.html");

            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    checkOutUrl = links.getHref();
                }
            }

        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }
        return checkOutUrl;
    }

    @PostMapping("/execute-payment")
    public PaymentResponseDTO executePayment(@RequestParam String paymentId, @RequestParam String payerId) throws PayPalRESTException {
        Payment payment = servicePaypal.executePayment(paymentId, payerId);

        if (!payment.getState().equals("approved")) {

           return null;
        }

        Transaction transaction = payment.getTransactions().get(0);

        int size = transaction.getDescription().length();
        Long idBooking = Long.parseLong(transaction.getDescription().substring(11, size));

        log.info("Booking: {}", idBooking);


        serviceBooking.updateStatusPaymentToCompleted(idBooking);
        return new PaymentResponseDTO(payment.getId(), payment.getCreateTime(), payment.getState(), transaction.getAmount().getTotal(), transaction.getAmount().getCurrency());
    }
}
