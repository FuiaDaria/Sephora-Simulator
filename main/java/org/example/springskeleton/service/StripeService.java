package org.example.springskeleton.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.config.Properties;
import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.entity.order.ChargeRequest;
import org.example.springskeleton.entity.order.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StripeService {
    private final Properties properties;

    public String charge(CustomerDto customerDto, float amount) throws StripeException {

        Stripe.apiKey = properties.getSecretKey();

        Customer customer = findOrCreateCustomer(customerDto.getUserDto().getEmail(), customerDto.getUserDto().getUsername());
        PaymentIntentCreateParams params = getPaymentIntentCreateParams((long) amount, customer);
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return paymentIntent.getClientSecret();
    }

    private PaymentIntentCreateParams getPaymentIntentCreateParams(long amount, Customer customer) {
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amount)
                        .setCurrency("usd")
                        .setCustomer(customer.getId())
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods
                                        .builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();
        return params;
    }

    private Customer findCustomerByEmail(String email) throws StripeException {
            CustomerSearchParams params =
                    CustomerSearchParams
                            .builder()
                            .setQuery("email:'" + email + "'")
                            .build();

            CustomerSearchResult result = Customer.search(params);

            return result.getData().size() > 0 ? result.getData().get(0) : null;
        }

        private Customer findOrCreateCustomer(String email, String name) throws StripeException {
            CustomerSearchParams params =
                    CustomerSearchParams
                            .builder()
                            .setQuery("email:'" + email + "'")
                            .build();

            CustomerSearchResult result = Customer.search(params);

            Customer customer;

            if (result.getData().size() == 0) {

                CustomerCreateParams customerCreateParams = CustomerCreateParams.builder()
                        .setName(name)
                        .setEmail(email)
                        .build();

                customer = Customer.create(customerCreateParams);
            } else {
                customer = result.getData().get(0);
            }

            return customer;
    }
}

