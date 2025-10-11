package com.Luma_v1.Hotel_Luma.service;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

public interface IServicePaypal {
    Payment createPayment(Double total,
                          String currency,
                          String method,
                          String intent,
                          String description,
                          String cancelUrl,
                          String successUrl) throws PayPalRESTException;

    Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;
}
