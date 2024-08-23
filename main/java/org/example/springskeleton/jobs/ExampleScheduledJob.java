package org.example.springskeleton.jobs;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Log4j2
public class ExampleScheduledJob {

  @Scheduled(fixedRate = 5000)
  public void exampleJob() {
    log.info("Example job executed");
  }
}
