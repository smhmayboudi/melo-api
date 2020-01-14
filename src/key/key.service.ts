import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
import { Key } from "./type/key";
// import { KeyEntity } from "./key.entity";
// import { KeyEntityRepository } from "./key.entity.repository";

@Injectable()
export class KeyService {
  private readonly keys: Key[];

  constructor() // @InjectRepository(KeyEntity)
  // private readonly keyRepository: KeyEntityRepository
  {
    this.keys = [
      {
        id: 1,
        private: `-----BEGIN PRIVATE KEY-----
        MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmOWllaOftWNY9
        wQOJZycv6oUTwvRNzKCgIkeBD7jHDc3pmucYRcKav9uO9YFef08h/x8xMCGYQisM
        c033ddy3G0xP3CgWhihRBG3Q3RrA0iWLf5UQ13JQt+yJf4MmtF3db53DHeLCGTVY
        5ROaD+da22uxNHd9IIE181b+iHiQ3cFBmUhE9FwAIManx36jqT8LJEOOb82JTOOo
        yMPPK6P98UXKUuZBQPcE31eBKu1yujfFeigzgO5AlACWiYPPKhpwC6bN+N5rElVt
        3pzi4HiUpwOhqhfdM2nZ45z1eKZXUT48OOV1gTl+zZYwbvrU/3/sOyMZcr6kFo9i
        8vCpunVzAgMBAAECggEBAKAJHGEnXExWQIZaI0aRytfGKfO5ui6BOZCTEFbAxTzY
        HIyxt5bV6yPEXeXIlpJdbdmkX+qilWWbJwkopkL+9c5Q+OrWYr400fIWmogBqDVG
        3iDtZ548X3I5cgF7g9CqzMhaIwDs8BnB3WvFuVaVwz/li0yj3/rXZa+EphgPWkzV
        taS8Jd/ZkxHLSPzAuMJNTwGuwy+HE6MPyWDLvzTvLXB29K+04dmPmISR9afc+pC6
        nkGd1143j6MTeM2Faplt7AsGi1I8v0RAgwg/Eihq3E0+7SKUi81g+uPuYGfM0W0x
        gAjdKwn8RLBnb4a8tDm3UqFn1oGE25tPln7wBqaD/ZECgYEA3Ak+8DSNmOiAHnUd
        q/n2ATvtSz4qPGD/0qwZ795ioymWqMyIsZHaSXbTuEDwfozfWusnHYYjs/Wu+ASe
        mkgOgCK+kgnAkdN+7NDollFXehXs5EezJXExhEpI/HNPa8RofGbVD7wtLyBKtNdV
        w8DdgRsFrPHE+G/eRkWGCkAhkLsCgYEAwWSR0f8Ybugyahj5XPVDE+C6Czs3twTi
        NXrHDLTvaFj2ok29WJw6kkHNw6+IOqhwjgksSXZ8dPhL/I+BuT0y7QmahCvUWuLB
        6WD/o8KrFZBoV9SNMXzvY/oZ/6/HoX991OOSwufjUszqn9Kk/toExhDJu+Kq6txK
        W3vojOIUHqkCgYEAyGiXbZrAGTQydQtAokHBobAeWjjdqS7D8vMTkJkhh/C6KzZX
        jjwE8IKNJbXoFatjR+EEOGzTmfY8jeNPPcBBjM2Ye1TskyVp5nIEVdzyat0LbYQs
        k/68Ffy+60hvXv1+GUhj6LgBA3pK8NlsYSYJ2axuB+4Q9CKX9bMe+bkdmT8CgYBx
        VcXbQlsITA2XffFNV/KqiI2fHWImYLdMzhouyS5wgYpwTYzEjDILGoNCxfDZJ3Nm
        2dtZZhXD2ut1JIjKjSH2JiWmhaUaaj9nzM+kIeZvacSsjET+lpAYkC6CWHpum6+b
        fo64qHrhQHPTm/fT3uLjTF1dPZYas2TkPjZnsepGmQKBgGXvUW40DK70pQXbPKPx
        DcVSBt+D9MhNY2fnFM+eiEXHR42l2160ynWg9dm0uvBGJ6MIeFAUms3vRonDINi7
        WSwutJveW95lYjaFmfaYFRWQD3Beo82QyDWz8S7x5PB7X4h18DqK09Nzp6evBFYa
        QQuZLlk4qpTpyO3hOohJFeDm
        -----END PRIVATE KEY-----`,
        public: `-----BEGIN CERTIFICATE-----
        MIIDYjCCAkoCCQCoTqJ+JoC+XTANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJV
        UzERMA8GA1UECAwITmV3IFlvcmsxETAPBgNVBAcMCEJyb29rbHluMSEwHwYDVQQK
        DBhFeGFtcGxlIEJyb29rbHluIENvbXBhbnkxGzAZBgNVBAMMEllPVVJET01BSU4u
        RVhBTVBMRTAeFw0xOTEyMTQxMDI0NDVaFw0yMDEyMTMxMDI0NDVaMHMxCzAJBgNV
        BAYTAlVTMREwDwYDVQQIDAhOZXcgWW9yazERMA8GA1UEBwwIQnJvb2tseW4xITAf
        BgNVBAoMGEV4YW1wbGUgQnJvb2tseW4gQ29tcGFueTEbMBkGA1UEAwwSWU9VUkRP
        TUFJTi5FWEFNUExFMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApjlp
        ZWjn7VjWPcEDiWcnL+qFE8L0TcygoCJHgQ+4xw3N6ZrnGEXCmr/bjvWBXn9PIf8f
        MTAhmEIrDHNN93XctxtMT9woFoYoUQRt0N0awNIli3+VENdyULfsiX+DJrRd3W+d
        wx3iwhk1WOUTmg/nWttrsTR3fSCBNfNW/oh4kN3BQZlIRPRcACDGp8d+o6k/CyRD
        jm/NiUzjqMjDzyuj/fFFylLmQUD3BN9XgSrtcro3xXooM4DuQJQAlomDzyoacAum
        zfjeaxJVbd6c4uB4lKcDoaoX3TNp2eOc9XimV1E+PDjldYE5fs2WMG761P9/7Dsj
        GXK+pBaPYvLwqbp1cwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBHU21m4Q/K0/DO
        sAEAToy+LEZoLhHm8JK5kpLI304Ac6QqVH3U1w1lNPcWbre6pFC0WdDX+3NKXKcd
        vhH6r+RV4ZUQUdNkbQ5rh7ij9EY5QZ02R0D0lTRuBM2FKxHXvaT2NTqzpPeylJjQ
        C6wmVS2s2a6Ws2eaLG0+okF0itVFwyJZ+prBpiJuQfpkRsocNBXjhY+4uLbee2tG
        Xww/kLGNkxgfiGn6Xu32GRaoSdTSd9Bx7bChAdqlwDAbHV0PQqID5oVItNJjRJGU
        NOlHRV0c5kVFNSOBvfCLRj8cJCoEL4mTAW+qDLY6K/p9gZ3sHot9aMFsbGsYq1At
        HVafLiw0
        -----END CERTIFICATE-----`
      }
    ];
  }

  // async findAll(): Promise<KeyEntity[]> {
  //   return this.keyRepository.find();
  // }

  // async findOne(id: number): Promise<KeyEntity | undefined> {
  //   return this.keyRepository.findOne(id);
  // }

  async findAllTest(): Promise<Key[]> {
    return Promise.resolve(this.keys);
  }

  async findOneTest(id: number): Promise<Key | undefined> {
    return Promise.resolve(this.keys.find(key => key.id === id));
  }
}
