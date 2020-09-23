import Joi from '../../../node_modules/joi/lib/index';
import User from '../../models/user';

// POST /api/auth/register
// {
//   username: 'velopert',
//   password: 'mypass123',
// }
export const register = async ctx => {
  // Request body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Confilct
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // DB에 저장

    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async ctx => {};

export const check = async ctx => {};

export const logout = async ctx => {};
