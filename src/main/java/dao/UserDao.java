package dao;

import app.HibernateUtil;
import models.User;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class UserDao {

    public static void addUser(User user) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.save(user);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    public static User getUserByLogin(String login) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Query query = session.createQuery("from User where login = :login", User.class);
            query.setParameter("login", login);
            return (User) query.getSingleResult();
        }
    }

    public static List<User> getUsers() {

        try (Session session = HibernateUtil.getSessionFactory().openSession()) {

            return session.createQuery("from User", User.class).list();

        }

    }
}

