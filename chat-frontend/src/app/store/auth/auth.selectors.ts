import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "./auth.reducer";

export const AUTH_STATE_NAME = 'auth'

export const getAuthState = createFeatureSelector<authState>(AUTH_STATE_NAME);

export const authUser = createSelector(getAuthState, state => state.user);

export const selectAuthUserId = createSelector(getAuthState, state => state.user?.email);

export const errorMessage = createSelector(getAuthState, state => state.errorMessage)

export const isAuthenticated = createSelector(getAuthState, state => !!state.user)