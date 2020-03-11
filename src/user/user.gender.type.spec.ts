import { UserGenderType } from "./user.gender.type";

describe("UserGenderType", () => {
  it("should equal to user geender type", () => {
    expect(UserGenderType).toStrictEqual({
      female: "female",
      male: "male"
    });
  });
});
