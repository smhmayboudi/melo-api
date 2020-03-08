import { UserGenderType } from "./user.gender.type";

describe("UserGenderType", () => {
  it("should be defined", () => {
    expect(UserGenderType).toStrictEqual({
      female: "female",
      male: "male"
    });
  });
});
