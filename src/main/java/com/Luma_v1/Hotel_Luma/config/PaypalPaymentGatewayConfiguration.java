package com.Luma_v1.Hotel_Luma.config;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class PaypalPaymentGatewayConfiguration {
    @Value("${paypal.mode}")
    private String paypalMode;

    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Bean //Establish the mode of the gateway
    public Map<String, String> paypalSdkConfiguration(){
        Map<String, String> paypalSdkConfig = new HashMap<>();
        paypalSdkConfig.put("mode", paypalMode);
        return paypalSdkConfig;
    }

    @Bean //Return authorization token with the credentials of clientId, clientSecret and mode
    public OAuthTokenCredential oAuthTokenCredential(){
        return new OAuthTokenCredential(clientId, clientSecret, paypalSdkConfiguration());
    }

    @Bean //Establish the api context with the token and mode
    public APIContext apiContext() throws PayPalRESTException{
         APIContext apiContext = new APIContext(oAuthTokenCredential().getAccessToken());
         apiContext.setConfigurationMap(paypalSdkConfiguration());
         return apiContext;
    }
}
