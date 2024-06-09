import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from 'src/auth/auth.constants';

const loginDto: AuthDto = {
	password: 'ewfwef',
	login: 'ewrger@greger.com',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '123' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.statusCode).toBe(401);
				expect(body.message).toBe(WRONG_PASSWORD_ERROR);
			});
	});

	it('/auth/login (POST) - fail login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: '123' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.statusCode).toBe(401);
				expect(body.message).toBe(USER_NOT_FOUND_ERROR);
			});
	});

	afterAll(async () => {
		disconnect();
	});
});
