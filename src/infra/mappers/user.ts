import { User } from "../../domain/views/user";
import { ExternalUserSchema } from "../schemas/external/user";

class UserMapper {
  static toEntity(user: ExternalUserSchema): User {
    return User.restore({
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      email: user.email,
      utc: user.utc,
      role: user.role,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    });
  }
}
export { UserMapper };
