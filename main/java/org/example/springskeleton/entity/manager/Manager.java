package org.example.springskeleton.entity.manager;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.entity.user.User;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_id")
        })
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Manager{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int salary;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
