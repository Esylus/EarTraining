import { TestBed, inject } from '@angular/core/testing';

import { SendMsgService } from './send-msg.service';

describe('SendMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendMsgService]
    });
  });

  it('should be created', inject([SendMsgService], (service: SendMsgService) => {
    expect(service).toBeTruthy();
  }));
});
