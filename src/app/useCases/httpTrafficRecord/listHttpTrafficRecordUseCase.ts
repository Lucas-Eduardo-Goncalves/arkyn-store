import { HttpTrafficRecordDAL } from "../../../domain/dal/httpTrafficRecord";

class ListHttpTrafficRecordUseCase {
  constructor(private httpTrafficRecordDAL: HttpTrafficRecordDAL) {}

  async execute(httpTrafficId: string) {
    const httpTrafficRecord = await this.httpTrafficRecordDAL.findById(
      httpTrafficId
    );

    return httpTrafficRecord?.toJson();
  }
}

export { ListHttpTrafficRecordUseCase };
