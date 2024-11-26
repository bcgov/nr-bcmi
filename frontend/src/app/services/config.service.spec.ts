import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@services/config.service';
import { ContentService } from './content-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

// Mocking ContentService
const mockContentService = {
  getRoutes: jest.fn(),
  getGlobalContent: jest.fn()
}

describe('ConfigService', () => {
  let configService: ConfigService;
  let router: Router;
  let contentService: ContentService;
  
  beforeEach(() => {
    window['__env'] = {};

    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        HttpClient,
        HttpHandler,
        { provide: Router, useValue: { config: [], resetConfig: jest.fn() } },
        { provide: ContentService, useValue: mockContentService }
      ],
      declarations: [],
      imports: []
    });

    configService = TestBed.inject(ConfigService);
    router = TestBed.inject(Router);
    contentService = TestBed.inject(ContentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('should initialize routes and configuration successfully', async () => {
      // Mock ContentService methods
      const mockRoutes = [{ attributes: { route: 'test-route' } }];
      mockContentService.getRoutes.mockResolvedValue(mockRoutes);
      mockContentService.getGlobalContent.mockResolvedValue({});

      await configService.init();

      expect(contentService.getRoutes).toHaveBeenCalled();
      expect(contentService.getGlobalContent).toHaveBeenCalled();
      expect(router.resetConfig).toHaveBeenCalled();
    });
  });

  describe('checkFeatureFlag', () => {
    it('should return true when feature flag matches expected value', () => {
      configService['configuration'] = { FEATURE_FLAG: { testFlag: 'enabled' } };

      const result = configService.checkFeatureFlag('testFlag', 'enabled');
      expect(result).toBe(true);
    });

    it('should return false when feature flag does not match expected value', () => {
      configService['configuration'] = { FEATURE_FLAG: { testFlag: 'disabled' } };

      const result = configService.checkFeatureFlag('testFlag', 'enabled');
      expect(result).toBe(false);
    });
  });

});
