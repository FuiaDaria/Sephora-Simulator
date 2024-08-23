package org.example.springskeleton.controller.review;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.review.ReviewDto;
import org.example.springskeleton.dto.review.ReviewRequestDto;
import org.example.springskeleton.entity.review.Review;
import org.example.springskeleton.globals.SingleBodyRequestDTO;
import org.example.springskeleton.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;

@RestController
@RequestMapping(REVIEW)
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public List<ReviewDto> findAll() {
        return reviewService.findAll();
    }

    @GetMapping(FILTERED_PART + PRODUCTID_PART)
    public List<ReviewDto> findAllFiltered(@PathVariable Long productId) {
        return reviewService.findAllFiltered(productId);
    }

    @GetMapping(ID_PART)
    public ResponseEntity<ReviewDto> get(@PathVariable Long id) {
        return reviewService.get(id);
    }

    @PostMapping
    public ReviewDto create(@RequestBody ReviewRequestDto dto) {
        return reviewService.create(dto);
    }

    @DeleteMapping(ID_PART)
    public void delete(@PathVariable Long id) {
        reviewService.delete(id);
    }

    @DeleteMapping
    public void deleteMultiple(@RequestParam List<Long> ids) {
        reviewService.deleteMultiple(ids);
    }

    @PutMapping(ID_PART)
    public ReviewDto update(@PathVariable Long id, @RequestBody ReviewRequestDto dto) {
        return reviewService.update(id, dto);
    }

    @PatchMapping(ID_PART + CHANGE_DESCRIPTION_PART)
    public ReviewDto changeDescription(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return reviewService.changeDescription(id, dto.getBody());
    }
}
