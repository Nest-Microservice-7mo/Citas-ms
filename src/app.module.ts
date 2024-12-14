import { Module } from '@nestjs/common';
import { CitasModule } from './citas/citas.module';

@Module({
  imports: [CitasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
