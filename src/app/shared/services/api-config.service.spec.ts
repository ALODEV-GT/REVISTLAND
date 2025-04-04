import { ApiConfigService } from './api-config.service';

describe('ApiConfigService', () => {
    let service: ApiConfigService;

    beforeEach(() => {
        service = new ApiConfigService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});