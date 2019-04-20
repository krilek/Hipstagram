package app;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

public class Main extends Application {

    public static void main(String[] args) {
        HibernateUtil.getSessionFactory();
        launch(args);
        if (HibernateUtil.getSessionFactory().isOpen()) {
            HibernateUtil.getSessionFactory().close();
        }
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        Scene rootScene = new Scene(new Pane(), 640, 480);
        CurrentSession.setSceneManager(rootScene);
        CurrentSession.getSceneManager().activate("start");
        primaryStage.setScene(rootScene);
        primaryStage.setTitle("Hipstagram");
        primaryStage.show();
    }
}
