package org.example.springskeleton.controller.shoppingcart;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.shoppingcart.ShoppingCartDto;
import org.example.springskeleton.dto.shoppingcart.ShoppingCartRequestDto;
import org.example.springskeleton.entity.shoppingcart.ShoppingCart;
import org.example.springskeleton.globals.SingleBodyRequestDTO;
import org.example.springskeleton.service.ShoppingCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;

@RestController
@RequestMapping(CART)
@RequiredArgsConstructor
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @GetMapping
    public List<ShoppingCartDto> findAll() {
        return shoppingCartService.findAll();
    }

    @GetMapping(FILTERED_PART + CUSTOMERID_PART)
    public List<ShoppingCartDto> findAllFiltered(@PathVariable Long customerId) {
        return shoppingCartService.findAllFiltered(customerId);
    }

    @GetMapping(ID_PART)
    public ResponseEntity<ShoppingCartDto> get(@PathVariable Long id) {
        return shoppingCartService.get(id);
    }

    @PostMapping
    public ShoppingCartDto create(@RequestBody ShoppingCartRequestDto dto) {
        return shoppingCartService.create(dto);
    }

    @DeleteMapping(ID_PART)
    public void delete(@PathVariable Long id) {
        shoppingCartService.delete(id);
    }

    @DeleteMapping
    public void deleteMultiple(@RequestParam List<Long> ids) {
        shoppingCartService.deleteMultiple(ids);
    }

    @PutMapping(ID_PART)
    public ShoppingCartDto update(@PathVariable Long id, @RequestBody ShoppingCartRequestDto dto) {
        return shoppingCartService.update(id, dto);
    }

    @PatchMapping(ID_PART + CHANGE_QUANTITY_PART)
    public ShoppingCartDto changeQuantity(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return shoppingCartService.changeQuantity(id, Integer.parseInt(dto.getBody()));
    }
}
