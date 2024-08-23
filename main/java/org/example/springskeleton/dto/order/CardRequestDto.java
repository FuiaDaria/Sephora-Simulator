package org.example.springskeleton.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardRequestDto {
    private String cardName;
    private String cardNumber;
    private String expiry;
    private String cvv;
}
