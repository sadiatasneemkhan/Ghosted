--
-- Seeding categories
--
INSERT INTO `categories` (`category`) VALUES
('Desserts'),
('Chinese Cuisine'),
('Mexican Cuisine'),
('South Asian Cuisine');

-- Seeding users (1 = customer, 2=restuarant)
INSERT INTO `users` (`user_type_id`, `phone`, `email`, `password`) VALUES
(1, '403-555-1111', 'customer@example.com',  'custpass123'),
(2, '403-555-2222', 'restaurant@example.com',  'restpass123'),
(1, '403-555-1234', 'adam.smith@example.com', 'adamspassword'),
(2, '403-555-5678', 'spicycorner@example.com',  'spicypass');

-- Seeding restaurants --> logos are default values
INSERT INTO `restaurants` (`user_id`, `account_status`, `first_name`, `last_name`, `business_name`, `address`, `city`, `province`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'restaurant@example.com'), 'approved', 'Jane', 'Doe', 'Jane''s Kitchen', '1234 Food St', 'Foodtown', 'Foodstate');

INSERT INTO `restaurants` (`user_id`, `account_status`, `first_name`, `last_name`, `business_name`, `address`, `city`, `province`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'spicycorner@example.com'), 'approved', 'Ava', 'Cook', 'Spicy Corner', '42 Spice Rd', 'Taste City', 'Flavor State');


-- Seeding customers
INSERT INTO `customers` (`user_id`, `first_name`, `last_name`, `address`, `city`, `province`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'customer@example.com'), 'John', 'Customer', '5678 Home St', 'Hometown', 'Homestate');

INSERT INTO `customers` (`user_id`, `first_name`, `last_name`, `address`, `city`, `province`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'adam.smith@example.com'), 'Adam', 'Smith', '100 Main St', 'Tech Town', 'Innovate State');

-- Seeding menu_items
INSERT INTO `menu_items` (`restaurant_id`, `name`, `description`, `price`, `is_available`, `category_id`) VALUES
((SELECT `restaurant_id` FROM `restaurants` WHERE `business_name` = 'Jane''s Kitchen'), 'Szechuan Chicken', 'Spicy and flavorful Chinese dish', 15.99, 1, (SELECT `category_id` FROM `categories` WHERE `category` = 'Chinese Cuisine')),
((SELECT `restaurant_id` FROM `restaurants` WHERE `business_name` = 'Jane''s Kitchen'), 'Tiramisu', 'Classic Italian dessert', 6.50, 1, (SELECT `category_id` FROM `categories` WHERE `category` = 'Desserts'));

INSERT INTO `menu_items` (`restaurant_id`, `name`, `description`, `price`, `is_available`, `category_id`) VALUES
((SELECT `restaurant_id` FROM `restaurants` WHERE `business_name` = 'Spicy Corner'), 'Kung Pao Chicken', 'A spicy stir-fry dish with chicken, peanuts, vegetables, and chili peppers.', 14.95, TRUE, (SELECT `category_id` FROM `categories` WHERE `category` = 'Chinese Cuisine'));

-- Seeding an order (default status_id = 1 --> pending)
INSERT INTO `orders` (`customer_id`, `restaurant_id`, `total`, `due_at`) VALUES
((SELECT `customer_id` FROM `customers` WHERE `user_id` = (SELECT `user_id` FROM `users` WHERE `email` = 'customer@example.com')), (SELECT `restaurant_id` FROM `restaurants` WHERE `user_id` = (SELECT `user_id` FROM `users` WHERE `email` = 'restaurant@example.com')), 22.49, NOW() + INTERVAL 1 HOUR);

INSERT INTO `orders` (`customer_id`, `restaurant_id`, `total`, `due_at`, `status_id`) VALUES
((SELECT `customer_id` FROM `customers` WHERE `first_name` = 'Adam'), (SELECT `restaurant_id` FROM `restaurants` WHERE `business_name` = 'Spicy Corner'), 29.90, NOW() - INTERVAL 1 DAY, (SELECT `order_status_id` FROM `order_statuses` WHERE `order_status` = 'completed')); 


-- Seeding order_items (assuming order_id and menu_item_id are correct)
INSERT INTO `order_items` (`order_id`, `item_id`, `quantity`) VALUES
((SELECT `order_id` FROM `orders` ORDER BY `order_id` DESC LIMIT 1), (SELECT `menu_item_id` FROM `menu_items` WHERE `name` = 'Szechuan Chicken'), 1),
((SELECT `order_id` FROM `orders` ORDER BY `order_id` DESC LIMIT 1), (SELECT `menu_item_id` FROM `menu_items` WHERE `name` = 'Tiramisu'), 2);

INSERT INTO `order_items` (`order_id`, `item_id`, `quantity`) VALUES
((SELECT `order_id` FROM `orders` WHERE `customer_id` = (SELECT `customer_id` FROM `customers` WHERE `first_name` = 'Adam')), (SELECT `menu_item_id` FROM `menu_items` WHERE `name` = 'Kung Pao Chicken'), 2);


-- Seeding messages
INSERT INTO `messages` (`sender_id`, `receiver_id`, `content`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'customer@example.com'), (SELECT `user_id` FROM `users` WHERE `email` = 'restaurant@example.com'), 'Do you have any vegan options?'),
((SELECT `user_id` FROM `users` WHERE `email` = 'restaurant@example.com'), (SELECT `user_id` FROM `users` WHERE `email` = 'customer@example.com'), 'Yes, we have several vegan options available!');


INSERT INTO `messages` (`sender_id`, `receiver_id`, `content`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'adam.smith@example.com'), (SELECT `user_id` FROM `restaurants` WHERE `business_name` = 'Spicy Corner'), 'Can I get extra peanuts on that Kung Pao Chicken?'),
((SELECT `user_id` FROM `restaurants` WHERE `business_name` = 'Spicy Corner'), (SELECT `user_id` FROM `users` WHERE `email` = 'adam.smith@example.com'), 'Absolutely, extra peanuts on the way!');


-- Seeding cart 
INSERT INTO `cart` (`user_id`, `restaurant_id`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'customer@example.com'), (SELECT `restaurant_id` FROM `restaurants` WHERE `business_name` = 'Jane''s Kitchen'));

INSERT INTO `cart` (`user_id`, `restaurant_id`) VALUES
((SELECT `user_id` FROM `users` WHERE `email` = 'adam.smith@example.com'), (SELECT `restaurant_id` FROM `restaurants` WHERE `business_name` = 'Spicy Corner'));


-- Seeding cart_items
INSERT INTO `cart_items` (`cart_id`, `item_id`, `quantity`) VALUES
((SELECT `cart_id` FROM `cart` WHERE `user_id` = (SELECT `user_id` FROM `users` WHERE `email` = 'customer@example.com')), (SELECT `menu_item_id` FROM `menu_items` WHERE `name` = 'Tiramisu'), 1);


INSERT INTO `cart_items` (`cart_id`, `item_id`, `quantity`) VALUES
((SELECT `cart_id` FROM `cart` WHERE `user_id` = (SELECT `user_id` FROM `users` WHERE `email` = 'adam.smith@example.com')), (SELECT `menu_item_id` FROM `menu_items` WHERE `name` = 'Kung Pao Chicken'), 1);