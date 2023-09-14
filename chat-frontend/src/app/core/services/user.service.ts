import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User} from "../interfaces/user";
import { Observable} from "rxjs";
import { editRequest } from "src/app/shared/components/profile-popup/profile-popup.component";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  authUrl = environment.apiUrlAuth

  constructor(private http: HttpClient) {}

  searchUsersByLetter(letter: string) {
    if (letter) {
      return this.http.get<User[]>(`${this.authUrl}/users/search/${letter}`);
    } else {
      return this.http.get<User[]>(`${this.authUrl}/users/search/random`);
    }
  }

  getUserByEmail(email: string):Observable<User> {
    return this.http.get<User>(`${this.authUrl}/users/user/${email}`)
  }

  editProfile(editReq:editRequest): Observable<{token: string}> {

    return this.http.post<{token: string}>(`${this.authUrl}/users/user/edit`, editReq)
  }


}
