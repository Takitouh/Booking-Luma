package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.service.IServicePaypal;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ServicePaypal implements IServicePaypal {

    private APIContext apiContext;

    public ServicePaypal(APIContext apiContext) {
        this.apiContext = apiContext;
    }

    @Override
    public Payment createPayment(Double total, String currency, String method, String intent, String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        // # Establish the total of the amount
        Amount amount = new Amount();
        amount.setCurrency(currency); //Set the currency of the amount
        //Use BigDecimal for decimal precision, establish 2 decimals and use standard round
        total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
        //Establish the format of the amount with 2 decimals and type float
        //We have to set the locale because the total must use . instead of ,
        amount.setTotal(String.format(java.util.Locale.US,"%.2f", total));

        // # Create transaction and set its description and amount
        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        // # Create list of transactions for add the previous transaction
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        // # Create Payer and set the payment method
        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        // # Create Payment and set intent (sale, authorize, order), payer and transactions
        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        // # Create redirect url for set the successful and failure url
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);

        // # Set the redirect url to the payment
        payment.setRedirectUrls(redirectUrls);
        // # Create the payment for the api context of PayPal
        return payment.create(apiContext);
    }

    @Override
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        // # Create the payment and set its id and create the PaymentExecution and set the Payer id
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        // # Execute the payment
        return payment.execute(apiContext, paymentExecution);
    }
}
