import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  private baseUrl = environment.apiUrlAuth;

  constructor(private http: HttpClient, private store: Store) {}

  upload(file: File, currentUserId: string): Observable<{ token: string }> | undefined {
    const formData: FormData = new FormData();
    formData.append("userId", currentUserId);
    formData.append("file", file);
    return this.http.post<{ token: string }>(`${this.baseUrl}/users/user/update`, formData, { reportProgress: true });
  }
}
