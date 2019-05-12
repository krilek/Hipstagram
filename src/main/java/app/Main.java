package app;

import dao.UserDao;
import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {

    public static void main(String[] args) {
        DatabaseContext.getEntityManagerFactory();
        launch(args);
        DatabaseContext.shutdown();
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        primaryStage.setResizable(false);
//        stage.getIcons().add(new Image("/path/to/stackoverflow.jpg"));
        CurrentSession.setSceneManager(primaryStage);
        CurrentSession.setCurrentlyLoggedUser(UserDao.getUserByLogin("krilek"));
        CurrentSession.getSceneManager().activate("main");
//        CurrentSession.getSceneManager().activate("start");
        primaryStage.setTitle("Hipstagram");
        primaryStage.show();
    }
}
