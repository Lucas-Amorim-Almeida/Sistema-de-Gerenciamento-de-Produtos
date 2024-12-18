import User from "@/core/User";

describe("Tests for User class", () => {
  const userData = { username: "username", password: "password123" };
  const userWithIdData = {
    id: "00002",
    username: "usernameWithID",
    password: "password1234",
  };

  let user: User;
  let userWithId: User;

  beforeEach(() => {
    user = new User(userData.username, userData.password);
    userWithId = new User(
      userWithIdData.username,
      userWithIdData.password,
      userWithIdData.id,
    );
  });

  describe("Constructor's tests", () => {
    it("Should be instance of User", () => {
      expect(user).toBeInstanceOf(User);
      expect(userWithId).toBeInstanceOf(User);
    });
  });

  describe("Test of getUser", () => {
    it("Should returns a object similar to UserType", () => {
      expect(user.getUser()).toEqual(userData);
      expect(Object.keys(user.getUser())).toHaveLength(2);

      expect(userWithId.getUser()).toEqual(userWithIdData);
      expect(Object.keys(userWithId.getUser())).toHaveLength(3);
    });
  });

  describe("Test of setId method", () => {
    it("Should have id change", () => {
      const newId = "12345";
      const userIdAdded = { id: newId, ...userData };

      user.setId(newId);
      expect(user.getUser()).toEqual(userIdAdded);
      expect(Object.keys(user.getUser())).toHaveLength(3);
    });

    it("Should not have id change", () => {
      const newId = userWithIdData.id + "12345";
      userWithId.setId(newId);
      expect(userWithId.getUser()).toEqual(userWithIdData);
    });
  });

  describe("Test of hashPassword method", () => {
    it("Should be true", async () => {
      await user.hashPassword();
      expect(user.getIsHashedPassword()).toBeTruthy();
    });

    it("Should not return", async () => {
      await user.hashPassword();
      expect(await user.hashPassword()).toBeUndefined();
    });
  });

  describe("Test of getIsHashedPassword method", () => {
    it("Should be false", () => {
      expect(user.getIsHashedPassword()).toBeFalsy();
    });
    it("Should be true", async () => {
      await user.hashPassword();
      expect(user.getIsHashedPassword()).toBeTruthy();
    });
  });

  describe("Test of userCompare method", () => {
    let userCreatedBySameData: User;
    let userCreatedByDiferentData: User;
    beforeEach(() => {
      //usuários de mock para test de comparação de senha
      userCreatedBySameData = new User(userData.username, userData.password);
      userCreatedByDiferentData = new User(
        userWithIdData.username,
        userWithIdData.password,
      );
    });

    it("Should be true", async () => {
      await user.hashPassword();
      expect(await user.userCompare(userCreatedBySameData)).toBeTruthy();
    });

    it("Should be false", async () => {
      await user.hashPassword();
      expect(await user.userCompare(userCreatedByDiferentData)).toBeFalsy();
    });

    it("Should have return an error user password without hash", async () => {
      //sem hash na senha de user
      await expect(user.userCompare(userCreatedBySameData)).rejects.toThrow(
        "This User instance must have a hashed password.",
      );
    });

    it("Should have return an error user compared with hashed password", async () => {
      await userCreatedBySameData.hashPassword();
      await expect(user.userCompare(userCreatedBySameData)).rejects.toThrow(
        "'otherUser' must not have a hashed password.",
      );
    });
  });
});
