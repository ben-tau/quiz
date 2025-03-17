import { ApiClient, ApiClientConfig } from './api/ApiClient';
import { IAuthService } from './interfaces/AuthService.interface';
import { IGameService } from './interfaces/GameService.interface';
import { IProfileService } from './interfaces/ProfileService.interface';
import { MockAuthService } from './auth/MockAuthService';
import { MockGameService } from './game/MockGameService';
import { MockProfileService } from './profile/MockProfileService';
import { ApiAuthService } from './auth/ApiAuthService';
import { ApiGameService } from './game/ApiGameService';
import { ApiProfileService } from './profile/ApiProfileService';

export interface ServiceConfig {
  apiUrl: string;
  useMock: boolean;
  timeout?: number;
  debug?: boolean;
}

export class ServiceFactory {
  private static instance: ServiceFactory;
  private apiClient: ApiClient | null = null;
  private config: ServiceConfig | null = null;

  private constructor() {}

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  initialize(config: ServiceConfig): void {
    this.config = config;
    if (!config.useMock) {
      const apiConfig: ApiClientConfig = {
        baseURL: config.apiUrl,
        timeout: config.timeout || 10000
      };
      this.apiClient = new ApiClient(apiConfig);
    }
  }

  getAuthService(): IAuthService {
    if (!this.config) {
      throw new Error('ServiceFactory not initialized');
    }

    if (this.config.useMock) {
      return new MockAuthService();
    }

    if (!this.apiClient) {
      throw new Error('ApiClient not initialized');
    }

    return new ApiAuthService(this.apiClient);
  }

  getGameService(): IGameService {
    if (!this.config) {
      throw new Error('ServiceFactory not initialized');
    }

    if (this.config.useMock) {
      return new MockGameService();
    }

    if (!this.apiClient) {
      throw new Error('ApiClient not initialized');
    }

    return new ApiGameService(this.apiClient);
  }

  getProfileService(): IProfileService {
    if (!this.config) {
      throw new Error('ServiceFactory not initialized');
    }

    if (this.config.useMock) {
      return new MockProfileService();
    }

    if (!this.apiClient) {
      throw new Error('ApiClient not initialized');
    }

    return new ApiProfileService(this.apiClient);
  }

  isUsingMock(): boolean {
    return this.config?.useMock ?? true;
  }

  getApiClient(): ApiClient | null {
    return this.apiClient;
  }
} 