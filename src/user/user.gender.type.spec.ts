import { UserGenderType } from "./user.gender.type";

describe("UserGenderType", () => {
  it("should be equal to user geender type", () => {
    expect(UserGenderType).toStrictEqual({
      female: "female",
      male: "male"
    });
  });
});
