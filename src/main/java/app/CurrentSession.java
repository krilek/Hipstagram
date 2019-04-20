package app;

import javafx.scene.Scene;
import models.User;
import sceneManager.SceneManager;

import java.io.IOException;

public class CurrentSession {
    private static User currentlyLoggedUser;
    private static SceneManager sceneManager;

    public static SceneManager getSceneManager() {
        return sceneManager;
    }

    static void setSceneManager(Scene s) throws IOException {
        CurrentSession.sceneManager = new SceneManager(s);
    }

    public static User getCurrentlyLoggedUser() {
        return currentlyLoggedUser;
    }

    public static void setCurrentlyLoggedUser(User currentlyLoggedUser) {
        // Todo: add login log
        CurrentSession.currentlyLoggedUser = currentlyLoggedUser;
        System.out.println("Zmieniono uzytkownika: " + currentlyLoggedUser);
    }

    public static void resetCurrentlyLoggedUser() {
        CurrentSession.currentlyLoggedUser = null;
    }
}
