import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ApiConfigService } from '@shared/services/api-config.service';
import { of } from 'rxjs';
import { Login, Register, Confirmation, Session, Rol } from '@shared/modules/auth/models/auth';
import { RoleDto } from '../models/role.interface';

describe('AuthService', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;
    let service: AuthService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);
        apiConfigServiceSpy = jasmine.createSpyObj('ApiConfigService', [], {
            'API_MAGAZINES': 'api/magazines'
        });

        service = new AuthService(httpClientSpy, apiConfigServiceSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login user and return session', (done: DoneFn) => {
        const mockLogin: Login = {
            email: 'test@example.com',
            password: 'password123'
        };

        const mockSession: Session = {
            token: 'token123',
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            profilePicture: 'profile.jpg',
            isDeleted: false,
            roleName: Rol.USER,
            firstname: 'Test',
            lastname: 'User'
        };

        httpClientSpy.post.and.returnValue(of(mockSession));

        service.login(mockLogin).subscribe({
            next: (response: Session) => {
                expect(response).withContext('expected session').toEqual(mockSession);

                expect(httpClientSpy.post)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                done();
            },
            error: (error) => {
                done.fail('Error en el test: ' + error);
            }
        });
    });

    it('should register user and return registered data', (done: DoneFn) => {
        const mockRegister: Register = {
            username: 'testuser',
            firstname: 'Test',
            lastname: 'User',
            email: 'test@example.com',
            password: 'password123',
            roleId: 1
        };

        httpClientSpy.post.and.returnValue(of(mockRegister));

        service.register(mockRegister).subscribe({
            next: (response: Register) => {
                expect(response).withContext('expected register data').toEqual(mockRegister);

                expect(httpClientSpy.post)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                done();
            },
            error: (error) => {
                done.fail('Error en el test: ' + error);
            }
        });
    });

    it('should confirm registration and return session', (done: DoneFn) => {
        const mockConfirmation: Confirmation = {
            email: 'test@example.com',
            code: '123456'
        };

        const mockSession: Session = {
            token: 'token123',
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            profilePicture: 'profile.jpg',
            isDeleted: false,
            roleName: Rol.USER,
            firstname: 'Test',
            lastname: 'User'
        };

        httpClientSpy.put.and.returnValue(of(mockSession));

        service.confirmation(mockConfirmation).subscribe({
            next: (response: Session) => {
                expect(response).withContext('expected session').toEqual(mockSession);

                expect(httpClientSpy.put)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                done();
            },
            error: (error) => {
                done.fail('Error en el test: ' + error);
            }
        });
    });

    it('should get roles for registration', (done: DoneFn) => {
        const mockRoles: RoleDto[] = [
            { id: 1, name: 'user' },
            { id: 2, name: 'admin' },
            { id: 3, name: 'editor' }
        ];

        httpClientSpy.get.and.returnValue(of(mockRoles));

        service.getRolesRegister().subscribe({
            next: (response: RoleDto[]) => {
                expect(response).withContext('expected roles').toEqual(mockRoles);
                expect(response.length).toBe(3);

                expect(httpClientSpy.get)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                done();
            },
            error: (error) => {
                done.fail('Error en el test: ' + error);
            }
        });
    });
});